import {getPollsByEventId} from "../../../DB/queries/poll.js";
import {getCandidatesByPollId} from "../../../DB/queries/candidate.js";
import {getVotersByCandidateList} from "../../../DB/queries/vote.js";
// import { getCandidatesByGuestId } from "../../../DB/queries/vote.js";

const simplifyList = list => {
	return list.map(n => n.get({plain: true}));
};

/**
 *
 * @param {int} pollId
 * @param {array of int} candidates
 *
 * 하나의 poll 은 여러개의 candidates (예. 기호1번, 기호2번 등)을 가지고 있음
 * 각 candidate 별 득표수를 계산하고,
 * 가장 많은 득표수를 받은 candidate의 firstPlace 값을 true로 설정하고,
 * candidates들을 묶어서 nItems 라는 하나의 array에 넣어서 poll 객체에 넣어주는 함수
 */
async function getItems(pollId, candidates) {
	const nItems = [];
	let firstPlaceIndex = [];
	let index = 0;
	let firstPlaceValue = 0;

	for (let n of candidates) {
		if (n.PollId === pollId) {
			const voters = await getVotersByCandidateList([n.id]);
			nItems.push({
				...n,
				voters: voters,
				voted: false,
				firstPlace: false,
			});
			// Poll에 속한 candidates들 중에 가장 많은 득표수를 받은 candidate을 찾아내는 부분
			if (voters == firstPlaceValue) {
				firstPlaceIndex.push(index);
			} else if (voters > firstPlaceValue) {
				firstPlaceIndex = [];
				firstPlaceIndex.push(index);
				firstPlaceValue = voters;
			}
			index++;
		}
	}
	// Poll에 속한 candidates들 중에 가장 많은 득표수를 받은 candidate을 지정하는 부분
	firstPlaceIndex.forEach(i => {
		nItems[i].firstPlace = true;
	});

	return nItems;
}

/**
 *
 * @param {array of object} polls
 *
 * 하나의 poll에 속한 candidates들을 DB에서 읽어오는 함수
 */
async function getCandidatesByPolls(polls) {
	const pollIdList = polls.map(poll => poll.id);
	let candidates = await getCandidatesByPollId(pollIdList);
	candidates = simplifyList(candidates);

	return candidates;
}

/**
 *
 * @param {array of object} items
 *
 * CandidateId (int) 만 읽어서 array로 반환해주는 함수
 */
const getCandidateList = items => {
	return items.map(n => n.id);
};

/**
 *
 * @param {array of object} polls
 * @param {array of object} candidates
 *
 * 여러개의 poll들과 그 poll들에 속하는 모든 candidates를 가져와서
 * 각 poll에 속한 candidates 들만 nItems 객체로 만들어서 저장함
 *
 * 그리고 해당 poll에 속한 모든 candidates들에 투표한 투표자수를 unique하게 더한 총투표수를 구함
 */
async function setPollItems(polls, candidates) {
	for (let poll of polls) {
		poll.nItems = await getItems(poll.id, candidates);
		const candidateList = getCandidateList(poll.nItems);
		poll.totalVoters = await getVotersByCandidateList(candidateList);
	}

	return polls;
}

/**
 *
 * @param {int} EventId
 * @param {int} guestId
 *
 * Yoga Resolver
 */
async function pollHostResolver(EventId) {
	/**
	 * getEventIdByEventCode(eventCode)
	 * getPollsByEventId(event.id)
	 * 해당 guestId가 어떻게 투표를 했는지에 대한 정보를 가져옴(active 여부와 상관없이)
	 *
	 */

	let polls = await getPollsByEventId(EventId);

	polls = simplifyList(polls);

	const candidates = await getCandidatesByPolls(polls);

	polls = await setPollItems(polls, candidates);

	return polls;
}

// noinspection JSUnusedGlobalSymbols
export default {
	Query: {
		pollHost: (_, {EventId}) => pollHostResolver(EventId),
	},
};

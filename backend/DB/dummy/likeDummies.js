import faker from "faker";
import config from "./initialConfig";

const {INIT_SEED, GUEST_NUM} = config;

faker.seed(INIT_SEED);

export default function makeLikeDummy(number = 100) {
	const bulkLike = [];

	for (let i = 0; i < number; ++i) {
		const createdAt = faker.date.past(1);
		const updatedAt = createdAt;
		const GuestId = faker.random.number({min: 1, max: GUEST_NUM});
		const QuestionId = faker.random.number({min: 1, max: 100});

		bulkLike.push({createdAt, updatedAt, GuestId, QuestionId});
	}
	return bulkLike;
}

"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "Events",
            [
                {
                    code: "ABCD",
                    moderationOption: false,
                    replyOption: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    endAt: new Date(),
                    HostId: 1,
                },
                {
                    code: "BBBD",
                    moderationOption: false,
                    replyOption: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    endAt: new Date(),
                    HostId: 2,
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Events", null, {});
    },
};

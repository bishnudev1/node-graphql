export const resolvers = {
    Query: {
        hello: () => "Hello World :)",
        getMyProfile: () => ({
            id: 1,
            name: "Bishnudev Khutia",
            email: "bishnudevkhutia20@gmail.com"
        }),
        getAllUsers: async () => [
            {
                id: 1,
                name: "Bishnudev Khutia",
                email: "bishnudevkhutia20@gmail.com",
            },
            {
                id: 2,
                name: "Sulekha Khutia",
                email: "sulekhakhutia20@gmail.com",
            },
        ],
    }
};
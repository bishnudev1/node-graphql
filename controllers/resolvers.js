import { session } from '../db/conn.js';

export const resolvers = {
    Query: {
        hello: () => "Hello World :)",
        getMyProfile: async (parent, args, context) => {
            try {
                if(context.userRoles.indexOf('USER') === -1){
                    throw new Error('Unauthorized');
                }
                const {name} = args;

                const resp = await session.run("MATCH (n:User {name: $name}) RETURN n", { name });
                // const result = await resp.next();
                const result = resp.records[0];
                return {
                    id: result.get('n').identity.low,
                    name: result.get('n').properties.name,
                    email: result.get('n').properties.email
                };
            } catch (error) {
                console.error(error);
                return null; // Or handle error as needed
            }
        },
        getAllUsers: async (parent, args, context) => {
            try {
                if(context.userRoles.indexOf('ADMIN') === -1){
                    throw new Error('Unauthorized');
                }

                const resp = await session.run("MATCH (n:User) RETURN n");
                const data = resp.records.map((record) => {
                    return {
                        id: record.get('n').identity.low,
                        name: record.get('n').properties.name,
                        email: record.get('n').properties.email
                    };
                });
                return data;
            } catch (error) {
                console.error(error);
                return null; // Or handle error as needed
            }
        }
    },
    Mutation: {
        createUser: async (_, { name, email }) => {
            try {
                const resp = await session.run("CREATE (n:User {name: $name, email: $email}) RETURN n", {
                    name,
                    email
                });
                const userNode = resp.records[0].get("n");
                return {
                    id: userNode.identity.low,
                    name: userNode.properties.name,
                    email: userNode.properties.email,
                };
            } catch (error) {
                console.error(error);
                return null; // Or handle error as needed
            }
        },
        deleteUser: async (_, { id }) => {
            try {
                const resp = await session.run("MATCH (n:User) WHERE id(n) = $id DELETE n", {
                    id
                });
                console.log("resp", resp);
                return true;
            } catch (error) {
                console.error(error);
                return false; // Or handle error as needed
            }
        },
        updateUser: async (_, { id, name, email }) => {
            try {

                const resp = await session.run("MATCH (n:User) WHERE id(n) = $id SET n.name = $name, n.email = $email RETURN n", {
                    id,
                    name,
                    email
                });
                const userNode = resp.records[0].get("n");
                return {
                    id: userNode.identity.low,
                    name: userNode.properties.name,
                    email: userNode.properties.email,
                };
            } catch (error) {
                console.log(error);
                return null;
            }
        },
    }
};

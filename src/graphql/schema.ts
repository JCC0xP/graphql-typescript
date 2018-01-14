import { makeExecutableSchema } from 'graphql-tools';

const Users: any[] = [
    {
        id: 1,
        name: 'Jon',
        email: 'jon@email.com'
    },
    {
        id: 2,
        name: 'Dany',
        email: 'dany@email.com'
    }
]

const typeDefs = `
    type User {
        id: ID!
        name: String !
        email: String!
    }

    type Query {
        allUsers: [User!]!
    }

    type Mutation {
        createUser(name: String!, email: String!): User
    }
`;

const resolvers = {
    Query: {
        allUsers: () => Users
    },
    Mutation: {
        createUser: (parent, args, context, info) => {
            const newUser = Object.assign({ id: Users.length + 1 }, args);
            Users.push(newUser);
            return newUser;
        }
    }
}

export default makeExecutableSchema({
    typeDefs,
    resolvers
});
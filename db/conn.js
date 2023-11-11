import neo4j from 'neo4j-driver';

const driver = neo4j.driver(
    'bolt://127.0.0.1:7687',
    neo4j.auth.basic('neo4j', 'newPassword')
);

const session = driver.session();

export const initializeDB = () => {
    session.run('MATCH (n) RETURN count(n) as count').then((result) => {
        console.log("Neo4j has connected successfully");
    }).catch((err) => {
        console.log(err);
    });
}

export { session };

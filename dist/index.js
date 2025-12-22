"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const schema_1 = require("./schema"); // Remove .js
const resolver_1 = require("./resolver"); // Remove .js and /index
const server = new server_1.ApolloServer({
    typeDefs: schema_1.typeDefs,
    resolvers: resolver_1.resolvers
});
const main = async () => {
    try {
        await server.start();
        const { url } = await (0, standalone_1.startStandaloneServer)(server, {
            listen: { port: 4000 },
        });
        console.log(`✅ Server started successfully!`);
        console.log(`🚀 Server ready at: ${url}`);
        console.log(`📅 Time: ${new Date().toLocaleTimeString()}`);
        // Keep server running
        process.on('SIGINT', () => {
            console.log('\n👋 Shutting down server...');
            process.exit(0);
        });
    }
    catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};
// Add error handlers
process.on('uncaughtException', (error) => {
    console.error('💥 Uncaught Exception:', error);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
});
main();

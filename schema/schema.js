const graphql = require("graphql");
const MongoClient = require("mongodb").MongoClient;

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt
} = graphql;

// have a team type be composed of TeamYear types

const url =
    "MY-CONNECTION-STRING";
const dbName = "basbeball";
let db;
let collection;


MongoClient.connect(url, function (err, client) {
    if (err) {
        console.log("error connecting to db");
        return;
    }
    console.log("Connected successfully to db");
    db = client.db(dbName);
    collection = db.collection("team");
});

const TeamYearType = new GraphQLObjectType({
    name: "TeamYear",
    fields: () => ({
        Team: {
            type: GraphQLString
        },
        Year: {
            type: GraphQLString
        },
        Wins: {
            type: GraphQLString
        },
        League: {
            type: GraphQLString
        },
        OBP: {
            type: GraphQLString
        },
        SLG: {
            type: GraphQLString
        },
        BattingAvg: {
            type: GraphQLString
        },
        RunsScored: {
            type: GraphQLString
        },
        RunsAllowed: {
            type: GraphQLString
        },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        TeamData: {
            type: new GraphQLList(TeamYearType),
            args: {
                teamName: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(parent, args) {
                return collection.find({
                    Team: args.teamName
                }).toArray();
            },
        },
        Year: { // !!!! not working
            type: new GraphQLList(TeamYearType),
            args: {
                year: {
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve(parent, args) {
                return collection.find({
                    Year: args.year
                }).toArray();
            },
        },
        TeamDataForYear: { //!!!!!   not working
            type: TeamYearType,
            args: {
                year: {
                    type: new GraphQLNonNull(GraphQLInt)
                },
                teamName: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(parent, args) {

                return collection.findOne({
                    Team: args.teamName,
                    Year: args.year
                });
            }
        },
        AllData: {
            type: new GraphQLList(TeamYearType),
            resolve(parent, args) {
                return collection.find({}).toArray();
            },
        },
        MinBattingAvg: {
            type: new GraphQLList(TeamYearType),
            args: {
                AVG: {
                    type: new GraphQLNonNull(GraphQLString)
                },
            },
            resolve(parent, args) {
                return collection.find({
                    BattingAvg: {
                        $gte: parseFloat(args.AVG)
                    }
                }).toArray();
            },
        },
        MinOBP: {
            type: new GraphQLList(TeamYearType),
            args: {
                OBP: {
                    type: new GraphQLNonNull(GraphQLString)
                },
            },
            resolve(parent, args) {
                return collection.find({
                    OBP: {
                        $gte: parseFloat(args.OBP)
                    }
                }).toArray();
            },
        },
        MinSLG: {
            type: new GraphQLList(TeamYearType),
            args: {
                SLG: {
                    type: new GraphQLNonNull(GraphQLString)
                },
            },
            resolve(parent, args) {
                return collection.find({
                    SLG: {
                        $gte: parseFloat(args.SLG)
                    }
                }).toArray();
            },
        }
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});

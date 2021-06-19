import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLInt, GraphQLList, GraphQLNonNull } from 'graphql';
import Book from '../models/book';
import Author from '../models/author';

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => {
        return {
            id: {
                type: GraphQLID,
            },
            name: {
                type: GraphQLString,
            },
            genre: {
                type: GraphQLString,
            },
            author: {
                type: AuthorType,
                resolve(parent, args) {
                    return Author.findById(parent.authorId);
                }
            },
        }
    }
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => {
        return {
            id: {
                type: GraphQLID,
            },
            name: {
                type: GraphQLString,
            },
            age: {
                type: GraphQLInt,
            },
            books: {
                type: new GraphQLList(BookType),
                resolve(parent, args) {
                    return Book.find({authorId: parent.id});
                }
            },
        }
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: {
                    type: GraphQLID,
                },
            },
            resolve(parent, args) {
                // code to get data from DB / other sources
                return Book.findById(args.id)
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: {
                    type: GraphQLID,
                },
            },
            resolve(parent, args) {
                // code to get data from DB / other sources
                return Author.findById(args.id)
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({})
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return Author.find({})
            }
        },
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString),
                },
                age: {
                    type: new GraphQLNonNull(GraphQLInt),
                },
            },
            resolve(parent, args){
                const author = new Author({
                    name: args.name,
                    age: args.age,
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString),
                },
                genre: {
                    type: new GraphQLNonNull(GraphQLString),
                },
                authorId: {
                    type: new GraphQLNonNull(GraphQLID),
                },
            },
            resolve(parent, args){
                const book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId,
                });
                return book.save();
            }
        },
    }
})

export default new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});

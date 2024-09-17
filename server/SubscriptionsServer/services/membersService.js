const membersRep = require("../repositories/membersRepository");
const memberModel = require("../models/memberModel");
const subModel = require("../models/subscriptionModel");
const movieModel = require("../models/movieModel");

const saveMembersToDB = async () => {
    try {
        //update DB just if collections is empty (in the first time the server up)
        const memberCount = await memberModel.countDocuments();
        if (memberCount === 0) {
            const { data: members } = await membersRep.getAllUsers()
            const membersData = members.map(member => ({
                Name: member.name,
                Email: member.email,
                City: member.address.city
            }));

            await memberModel.insertMany(membersData)
            console.log('Members initially loaded into DB')
        } 

        return "Members processed in DB...";
    } catch (error) {
        console.error('Error processing members in DB:', error)
        throw error
    }
};

const getAllMembers = ()=>{
    return memberModel.find({}, { __v: 0 })
}

const getMemberById = (id)=>{
    return memberModel.findById(id, { __v: 0 })
}

const getMoviesSubByMemberId = async(id)=>{
    try {
        // Fetch subscriptions for the given member ID
        const subscriptions = await subModel.find({ MemberId: id })

        // Extract movies and flatten the array
        const movies = subscriptions.map(sub => sub.Movies).flat()

        // Fetch movie names for each movie in the subscriptions
        const moviesWithNames = await Promise.all(movies.map(async movie => {
            const movieData = await movieModel.findById(movie.movieId);
            return {movieId:movie.movieId, date:movie.date, memberId:id , Name: movieData ? movieData.Name : 'Unknown' }; // Provide a default value if movieData is not found
        }));

        return moviesWithNames;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw new Error('Failed to fetch movies for the given member ID.');
    }
}

const newMember = async (member) => {
  const newMember = new memberModel(member);
  await newMember.save();
  return "Member Created...";
};

const updateMember =async(id,newData)=>{
    await memberModel.findByIdAndUpdate(id,newData)
    return "Member Updated..."
}

const deleteMember = async (id) => {
    try {

        // Step 1: Delete the member from the members collection
        const memberDeletionResult = await memberModel.findByIdAndDelete(id)

        // Step 2: Delete related subscriptions
        const subscriptionDeletionResult = await subModel.deleteMany({ MemberId: id })

        return "Member and related subscriptions deleted successfully"
    } catch (error) {
        console.error("Error deleting member and related subscriptions:", error)
        throw error;
    }
};

module.exports = { saveMembersToDB , deleteMember,newMember ,getMemberById,updateMember , getMoviesSubByMemberId , getAllMembers};

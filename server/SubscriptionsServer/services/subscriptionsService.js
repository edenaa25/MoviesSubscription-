const subModel = require("../models/subscriptionModel")
const memberModel = require("../models/memberModel")

//return subscriptions by movie id with member name { MemberId:, MemberName: , Date:}
const allSubByMovieId = async (movieId) => {
    const subscriptions = await subModel.find({ "Movies.movieId": movieId })
    
    const result = await Promise.all(subscriptions.map(async (sub) => {
        const memberData = await memberModel.findById(sub.MemberId)
        const movie = sub.Movies.find(movie => movie.movieId === movieId)
        return { MemberId: sub.MemberId, MemberName: memberData.Name, Date: movie.date }
    }));

    return result;
};

const createSubscription = async(newData)=>{
    const newSub = new subModel(newData)
    await newSub.save()
    return "Subscription Created..."
}

//movie: {movieId , date}
const addOrUpdateSubscription = async (memberId, movie) => {
    // Check if the member exists
    console.log(memberId,movie)
    let subscription = await subModel.findOne({ MemberId: memberId })

    if (subscription) {
        // Member exists, update their subscription
        subscription.Movies.push(movie)
        await subscription.save()
        return 'Subscription updated'
    } else {
        // Member does not exist, create a new subscription
        const newSubscription = new subModel({ MemberId: memberId, Movies: [movie] })
        await newSubscription.save()
        return 'New subscription created'
    }
}

module.exports = {allSubByMovieId , createSubscription , addOrUpdateSubscription}


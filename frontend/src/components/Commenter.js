function Commenter({profile}) {
    console.log(profile)
    return(
        <div class="relative flex gap-4">
        <img src={profile.pfp} class="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20" alt="" loading="lazy"/>
        <div class="flex flex-col w-full">
            <div class="flex flex-row justify-between">
                <p class="relative text-xl whitespace-nowrap truncate overflow-hidden">{profile.name}</p>
                <a class="text-gray-500 text-xl" href="#"><i class="fa-solid fa-trash"></i></a>
            </div>
            <p class="text-gray-400 text-sm">Date and Time Commented</p>
        </div>
    </div>
    
    )

}
export default Commenter
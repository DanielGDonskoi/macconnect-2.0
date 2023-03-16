function Person({profile}) {
    return(

        <div>
            <h3>
            {profile.name}
            </h3>
            {profile.bio}
            <h3>
            {profile.pfp}
            </h3>
        </div>
    
    )

}
export default Person
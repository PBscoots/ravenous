const apiKey = process.env.YELP_API_KEY;
console.log(apiKey);
const Yelp = {
  search(term, location, sortBy){
    console.log('at least I got here');
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,{
        headers:{
          Authorization: `Bearer ${apiKey}`
        }
      }).then(response => {
        return response.json();
      }).then(jsonResponse=> {
        let j2 = {};
        if(jsonResponse.businesses){
          console.log('now im here');
           j2 = jsonResponse.businesses.map(business=> (
            {
                id: business.id,
                imageSrc: business.image_url,
                name: business.name,
                address: business.location.address1,
                city: business.location.city,
                state: business.location.state,
                zipCode: business.location.zip_code,
                category: business.categories[0].title,
                rating: business.rating,
                reviewCount: business.review_count
            })
          );
        };
        console.log(j2);
        return j2;
      });
  }
}

export default Yelp;

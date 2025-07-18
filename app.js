import express from 'express';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));



app.get("/", (req, res) => {
    res.render("index.ejs", {cities: cities});
});

app.get("/see/:cityName", (req, res) => {
    const cityName = req.params.cityName;
    const cityData = cities[cityName];

    
    if(cityData){
        res.render("cityDetail.ejs", {city: cityData, key: cityName});
    }  
});

app.get("/create", (req, res) => {
    res.render("create.ejs");
});

app.post("/create", (req, res) => {
    const { cityName, subtitle, author, url, url1, url2, url3, content } = req.body;

    cities[cityName.toLowerCase()] = {
        name: cityName,
        subtitle,
        url,
        author,
        content,
        date: new Date().toISOString().split("T")[0],
        images: [url1, url2, url3]
    };

    res.redirect("/");
});

app.get("/edit/:cityName", (req, res) => {
    const cityName = req.params.cityName;
    const cityData = cities[cityName];

    
    if(cityData){
        res.render("edit.ejs", {city: cityData, key: cityName});
    }  
});

app.post("/edit/:city", (req, res) => {
  const currentCity = req.params.city;
  const { cityName, subtitle, author, url, url1, url2, url3, content } = req.body;

  if ( currentCity !== cityName.toLowerCase()) {
    delete cities[currentCity];
  }

  cities[cityName.toLowerCase()] = {
    name: cityName,
    subtitle,
    url,
    author,
    content,
    date: new Date().toISOString().split("T")[0],
    images: [url1, url2, url3]
  };

  res.redirect("/");
});

app.post("/delete/:city", (req, res) => {
  const currentCity = req.params.city;
  
  if (currentCity) {
    delete cities[currentCity];
  }

  res.redirect("/");
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});


app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
});


const cities = {
    paris: {
    name: "Paris",
    subtitle: "The City of Light",
    url: "https://hips.hearstapps.com/hmg-prod/images/the-eiffel-tower-in-paris-royalty-free-image-1722454333.jpg",
    author: "Carolina G.",
    content: "A city where every corner whispers romance and every café hides a love story.",
    date: "2025-07-16", 
    images: ["https://blog.tourexperto.com/wp-content/uploads/2024/04/pareja-sentada-frente-a-la-torre-eiffel.jpg",
             "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGFyJUMzJUFEc3xlbnwwfHwwfHx8MA%3D%3D",
             "https://paisajismodigital.com/blog/wp-content/uploads/2022/04/proyecto-one-torre-eiffel.jpg"]
  },
  newYork: {
    name: "New York",
    subtitle: "The City That Never Sleeps",
    url: "https://blog.viajemos.com/wp-content/uploads/2023/06/%C2%BFQue-hacer-un-dia-en-New-York-3.jpg",
    author: "Carolina G.",
    content: "The city that never sleeps, where dreams wear skyscrapers and ambition walks fast.",
    date: "2025-07-16", 
    images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/New_york_times_square-terabass.jpg/960px-New_york_times_square-terabass.jpg",
             "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Lower_Manhattan_from_Governors_Island_August_2017_panorama.jpg/960px-Lower_Manhattan_from_Governors_Island_August_2017_panorama.jpg", 
             "https://imanesdeviaje.com/wp-content/uploads/2014/07/lugares-de-pelicual-en-nueva-york-daily-bugle.jpg"]
  },
  tokyo: {
    name: "Tokyo",
    subtitle: "Futuristic Tradition",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEnqLgvl4MYwd--diUst4jEKyHYdNHs3MSVQ&sg",
    author: "Carolina G.",
    content: "A neon symphony of tradition and tech, where shrines and robots share the same skyline.",
    date: "2025-07-16", 
    images: ["https://t3.ftcdn.net/jpg/02/65/23/70/360_F_265237090_Muthvb72m2POYFjyx7F5UCQLh9JdBtKN.jpg", 
             "https://hips.hearstapps.com/hmg-prod/images/high-angle-view-of-tokyo-skyline-at-dusk-japan-royalty-free-image-1664309926.jpg", 
             "https://png.pngtree.com/thumb_back/fh260/background/20210913/pngtree-photograph-of-the-cityscape-of-tokyo-japan-image_877482.jpg"]
  },
  istanbul: {
    name: "Istanbul",
    subtitle: "Where East Meets West",
    url: "https://www.foodandwine.com/thmb/c5OBsRXsJ69Ur92hsGrjz8WijIU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Istanbul-Yeni-Camii-mosque-FT-MAG-0225-514497e0284d4f0389861b37e1d9a12e.jpg",
    author: "Carolina G.",
    content: "Where continents kiss and minarets echo stories of empires and spice.",
    date: "2025-07-16", 
    images: ["https://media-cdn.tripadvisor.com/media/photo-s/17/76/f7/ea/istanbul-turkey-bosphorusstrai.jpg", 
              "https://elviajerofeliz.com/wp-content/uploads/2019/05/Que%CC%81-ver-en-Estambul.jpg", 
              "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/507000/507776-galata-bridge.jpg"]
  }
}
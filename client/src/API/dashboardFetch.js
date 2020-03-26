export function fetchProfileData() {
   
    let weatherPromise = fetchWeatherData();
    return {
      weather: wrapPromise(weatherPromise)
    };
}

  function wrapPromise(promise) {
    let status = "pending";
    let result;
    let suspender = promise.then(
      r => {
        status = "success";
        result = r;
      },
      e => {
        status = "error";
        result = e;
      }
    );
    return {
      read() {
        if (status === "pending") {
          throw suspender;
        } else if (status === "error") {
          throw result;
        } else if (status === "success") {
          return result;
        }
      }
    };
  }
  
//   function fetchUser() {
//     console.log("fetch user...");
//     return new Promise(resolve => {
//       setTimeout(() => {
//         console.log("fetched user");
//         resolve({
//           name: "Ringo Starr"
//         });
//       }, 1000);
//     });
//   }
  
  function fetchWeatherData() {

    console.log("fetch posts...");

    return new Promise(resolve => {
      

        let month = "1";
        let week = "2";

        fetch(`/api/getHighs?month=${encodeURIComponent(month)}&week=${encodeURIComponent(week)}`, {
          method: "GET"
        })
        //fetch('/api/getHighs?'+$.param({month: month, week: week}))
       
        .then(res => res.json())
        .then(json => {
            resolve(
                
                console.log(json)
        
            );
    
        });

    });
  }
  
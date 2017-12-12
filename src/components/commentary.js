import React from 'react';  
  
export default (props) => {
    const rand1 = Math.round(Math.random(0,2));
    const rand2 = Math.round(Math.random(0,2));

    let commentary = "";

    // Temp based statements
    if(props.temp <= 32) {
      const options = ["Burrrr! It be chilly out there. Remember your winter coat if you don't want to freeze. A hat and scarf would be a good idea too.  ", "Don't forget your hat, scarf, and gloves. You don't wanna turn into a human popsicle out there! "]
      commentary += options[rand1];
    }

    else if(props.temp > 32 && props.temp < 45) {
      const options = ["A fuzzy hat and scarf would probably be nice. ", "It's cold out today, so remember a warm jacket. "]
      commentary += options[rand1];
    }

    else if(props.temp >= 45 && props.temp < 65) {
      const options = ["A light jacket would be a good choice. ", "It's not too bad out there. "]
      commentary += options[rand1];
    }

    else if(props.temp >= 65 && props.temp < 85) {
      const options = ["It's pretty hot out there, remember to wear something light and airy. ", "Ahhhh, nice and toasty. No need for a jacket, it's plenty warm out there. "]
      commentary += options[rand1];
    }

    else if(props.temp > 85) {
      const options = ["It's hot out there! Something light and airy would be best to help you stay cool. And remember to stay hydrated!",]
      commentary += options[rand1];
    }

    // Weather based statements
    if(props.weather === "Rain") {
      const options = ["If you don't wanna get soggy, your should remember an umbrella or rain jacket. ", "It's pretty wet out there, you might want an umbrella. ", "Yup, that's definitely rain out there. Prepare to get wet! "]
      commentary += options[rand2];
    }

    else if(props.weather === "Clear") {
      const options = ["Go soak in some of those rays. ", "Enjoy the blue skies! ", "It'd be a great day to enjoy some time outdoors. "]
      commentary += options[rand2];
    }

    return commentary;
    // return <p className="advice-text">{ commentary }</p>;
  }

  
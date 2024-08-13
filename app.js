$(document).ready(function () {
    let typingTimer;
    const typingDelay = 1000;

    $('#city').on('keyup', function () {
        clearTimeout(typingTimer);
        const cityName = $(this).val();

        if (cityName.length > 2) {
            typingTimer = setTimeout(function () {
                $.ajax({
                    url: `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=448d613fee334fd55bb8bbef41c48b89`,
                    method: "GET",
                    success: function (data) {
                        if (data.main) {
                            $('.weather__city').text(capitalizeFirstLetter(data.name));
                            $('.weather__temperature').html(`${(data.main.temp - 273.15).toFixed(2)} &#176C`);
                            $('.weather__realfeel').html(`${(data.main.feels_like - 273.15).toFixed(2)} &#176C`);
                            $('#minTemp').text((data.main.temp_min - 273.15).toFixed(2));
                            $('#maxTemp').text((data.main.temp_max - 273.15).toFixed(2));
                            $('.weather__humidity').text(`${data.main.humidity}%`);
                            $('.weather__wind').text(`${data.wind.speed} m/s`);
                            $('.weather__pressure').text(`${data.main.pressure} hPa`);
                            $('.weather__forecast').text(data.weather[0].description);

                            const iconCode = data.weather[0].icon;
                            const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@4x.png`;
                            $('.weather__icon').html(`<img src="${iconUrl}" alt="Weather icon">`);

                            $('.container').addClass('active');
                        } else {
                            resetWeatherInfo();
                        }
                    },
                    error: function () {
                        resetWeatherInfo();
                    }
                });
            }, typingDelay);
        } else {
            resetWeatherInfo();
        }
    });

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    function resetWeatherInfo() {
        $('.weather__city').text('Invalid city name or no data found!');
        $('.weather__temperature').html('');
        $('#minTemp, #maxTemp, .weather__humidity, .weather__wind, .weather__pressure, .weather__forecast').text('N/A');
        $('.weather__icon').html('');
        $('.container').removeClass('active');
    }
});

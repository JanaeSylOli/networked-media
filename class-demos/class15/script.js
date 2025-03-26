window.onload => {
    document.getElementById("submit").addEventListener("click", () => {}

    function search{
        console.log("clicked");


    // retrieve data from the input field
    const inputText = document.getElementById("TextInput").value;

    const params = new URLSearchParams(
        (
            apikey: "45942ea9"
            search: inputText,
            type: "movie"


        )
    );
    let url = "http://www.omdbapi.com/?" + params.toString();
    let response = await fetch(url);

    console.log(response);

    }

}
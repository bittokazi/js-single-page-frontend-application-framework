export default function(url, success, error) {
    return {
        get: (url, success, error) => {
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status>=200 && this.status<=200) {
                    success({
                        status: this.status,
                        body: JSON.parse(this.responseText)
                    });
                } else if(this.readyState == 4) {
                    error({
                        status: this.status,
                        body: this.responseText
                    });
                }
            };
            xhttp.open("GET", url, true);
            xhttp.send();
        }
    }
}
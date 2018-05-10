 export function httpGet(url) {
        return new Promise(function (resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.setRequestHeader('authorization', localStorage.getItem('token'));
            
            xhr.onload = function () {
                if (this.status == 200) {
                    try {
                        resolve(JSON.parse(this.response));
                    } catch (error) {
                        console.log(error)
                    }
                } else {
                    let error = new Error(this.statusText);
                    error.code = this.status;
                    reject(error);
                }
            };
            xhr.onerror = function () {
                reject(new Error('Network Error'));
            };
            xhr.send();
        });
    };

export function httpPost(url, data) {
    return new Promise((resolve, reject) => {
        const x = new XMLHttpRequest();
        x.onerror = () => reject(new Error('jsonPost failed'))
        x.open("POST", url, true);
        x.onload = function () {
            if (this.status == 200) {
                try {
                    resolve(JSON.parse(this.response));
                } catch (error) {
                    console.log(error)
                }
            } else {
                let error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };
        x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        x.send(data)
    })
}

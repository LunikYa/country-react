 export function httpGet(url, token) {
        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
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
            if(token)
                xhr.setRequestHeader('x-access-token', token)
            xhr.send();
        });
    };


export function httpPost(url, data = {}, token) {
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
        x.setRequestHeader('Content-Type', 'application/json');
        x.setRequestHeader('x-access-token', token) 
        x.send(JSON.stringify(data))
    })
}


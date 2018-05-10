export function http(url, method, data) {
    return new Promise((resolve, reject) => {
        const x = new XMLHttpRequest();
        x.onerror = () => reject(new Error('jsonPost failed'))
        x.open(method, url, true);
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

        if(method === 'GET')
            x.setRequestHeader('authorization', localStorage.getItem('token'));

        x.send(data)
    })
}


const BASE_URL = 'http://localhost:8000/';
// const routeUrl = 'api/resource';

async function PutData1(routeUrl, itemId, data) {

    const url = `${BASE_URL}${routeUrl}${itemId}`;

    console.log("this is PutData1");

    if (itemId === null || itemId === undefined) {
        itemId = 1;
    }

    return await fetch(url, {
        method: 'PUT',
        headers: {
            // headers in this section, only 1 in this case
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then( (response) => {
            if (!response.ok) {
                throw new Error('PUT request failed');
            }
            // the respponse is here
            return response.json();
        })
        .then( (data)=> {
            // data here
            console.log('PUT request successful:', data);
        })
        .catch( (error) => {
            console.error('Error occurred during PUT request:', error);
        });

}

export default PutData1;

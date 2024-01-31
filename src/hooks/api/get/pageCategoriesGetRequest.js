export default function pageCategoriesGetRequest(url,categoryPages){

    // const showCategories = function(url) {
        // `${api_url}ajax/get/show-pages.php`
        fetch(url, {
        })
            .then((response) => response.json())
            .then((data) => {
                const results = [];
                for (const id in data) {
                    results.push({ page_id: data[id].page_id,
                        magazi_id: data[id].magazi_id,
                        page_name: data[id].page_name,
                        page_description: data[id].page_description })
                }
                console.log("results", results);
                categoryPages.value = results;
                console.log("categoryPages", categoryPages);
    
    
            })
            .catch((error) => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    
    // }

}
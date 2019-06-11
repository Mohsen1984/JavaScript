
const httpa=new easyHTTP();

httpa.get('https://jsonplaceholder.typicode.com/posts',
                        function(response)
                        {
                            console.log(response);
                           
                        }
);

export const  managerStorage = {
        set(key,value){
            if (typeof value === 'string') {
                localStorage.setItem(key, value);
            } else {
                localStorage.setItem(key, JSON.stringify(value));
            }
        },
        get(key){
             const result = localStorage.getItem(key);

             try{
                    return  result?JSON.parse(result) : null
             }catch(error){
                console.error("Error parsing");
                return result; // Return raw string if parsing fails
             }
        },

        clear(){
            localStorage.clear();
        },
        remove(key){
            localStorage.removeItem(key);
        }
}
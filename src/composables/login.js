import axios from 'axios'
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue'

export function useLogin() {

    	// 	const username= ref("james")
		// const password = ref("123")

    const password = ref('0lelplR')
    const username = ref('kminchelle')
    const isAuth = ref(true);
    
    const router = useRouter()
    const url = import.meta.env.VITE_MAIN_URL;

    // function onLogin() {
		// 	fetch("http://localhost:3003/login", {
		// 		method: "POST",
		// 		headers: {
		// 			"Accept": "application/json",
		// 			"Content-Type": "application/json",
		// 		},
		// 		body: JSON.stringify({
		// 			mb_nick: username.value,
		// 			mb_password: password.value
		// 		})
		// 	}).then(res => res.json()).then(({data}) => {
		//         console.log(data);
    
								
		// 						console.log(data.mb_type);
		// 				if (data.mb_type === "ADMIN") {
		//               // router.push({ name: "home" });
    //           localStorage.setItem("token",data.mb_type )
		// 					router.push({ name: "admin-main" });
		// 				} else { 
		// 					alert("you are not allowed to this site!")
		// 				}

								
		// 			}
		// 			)
		// }
    
    async function onLogin() {
        const res = await axios.post(url + 'auth/login', {
            password: password.value,
            username: username.value
        });
        if (!res?.data?.token && res.status !== 200) {
            return;
        }
        localStorage.setItem('token', res?.data?.token)
       router.push({ name: "admin-main" });
    }

    onMounted(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            localStorage.removeItem('token')
            isAuth.value = false;
        }
    })
    

    return {
        onLogin,
        password,
        username,
        isAuth
    }
}

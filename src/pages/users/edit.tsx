import UserForm from "@/components/complex/userForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const UserEditPage = () => {
    const router = useRouter();
    const [id, setId] = useState(router.query)

    useEffect(() => {
        console.log(router.isReady)
        if (router.isReady) {
            setId(router.query)
        }
    }, [router.isReady, id])

    return (
        id.id != undefined ? <UserForm id={id.id}></UserForm> : <></>
    );
}

export default UserEditPage;
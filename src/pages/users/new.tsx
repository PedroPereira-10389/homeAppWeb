import UserForm from "@/components/complex/userForm";
import { useRouter } from "next/router";

const UserPage = () => {
    const router = useRouter();
    const { id } = router.query

    return (
        <UserForm id={id}></UserForm>
    )
}

export default UserPage;
import { render } from "@react-email/render";
import PasswordEmail from "./PasswordEmail";
import { useMutation } from "@tanstack/react-query";
import { sendEmail as sendEmailApi } from "../../services/apiEmail";
import { toast } from "react-toastify";

// export function useEmail() {
//   const emailHtml = render(<PasswordEmail />);

//   const {} = useMutation({
//     mutationFn: ()=>sendEmailApi({emailHtml}),
//     onSuccess:()=>toast.success('')
//   })

//   return;
// }

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const Swal2 = withReactContent(Swal);
export const successAlert = (message) => {
  return Swal2.fire({
    icon: "success",
    title: message,
  });
}
export const errorAlert = (messages) => {
  let htmlMessages = "<ul>";
  messages.map((val, key) => {
    Object.entries(val).forEach(([keyMsg, msg])=>{
      htmlMessages += `<li style="text-align:left; color:red;">${msg}</li>`;
    });
  });
  htmlMessages += "</ul>";

  return Swal2.fire({
    icon: "error",
    title: "Error",
    html: htmlMessages,
    showCloseButton: true,
  });
}

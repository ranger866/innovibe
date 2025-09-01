export const API_URL = "http://50.50.50.150/api/api.php";

export function print(data) {
    const output = document.getElementById("output");
    if (output) {
        output.textContent += JSON.stringify(data, null, 2) + "\n\n";
    } else {
        console.log(data);
    }
}

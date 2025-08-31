export const API_URL = "http://innovibe.local/api/api.php";

export function print(data) {
    const output = document.getElementById("output");
    if (output) {
        output.textContent += JSON.stringify(data, null, 2) + "\n\n";
    } else {
        console.log(data);
    }
}

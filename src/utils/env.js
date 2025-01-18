import { Platform } from "react-native";

const liveHost = "https://us-central1-mealstogoservers.cloudfunctions.net";
const localHost = "http://localhost:5001/mealstogoservers/us-central1";

export const stripePublicKey = "pk_test_51INfFHAZVaVihUOgnoo44zyZ7oVGgRBzMv3g2YnteERV4c6YBCEmgpmTHHwdyRfWZm2gfsQlZzTs6dAxyX1705xN0019V5KBir"

export const isAndroid = Platform.OS === "android";
export const isDevelopment = process.env.NODE_ENV === "development";
export const isMock = true;
export const host = !isDevelopment || isAndroid ? liveHost : localHost;
//export const api_url =  "https://stage.monytransfer.com/v1/";
export const api_url = isAndroid ? "http://10.0.2.2/v1/" : "http://localhost/v1/";
 ///export const api_url = "https://8feb-2-31-14-223.ngrok-free.app/v1/";
export const store_id = "2bda0c37-4eac-44e5-a014-6c029d76dc62";
export const process_store_id = `process_store_id=${store_id}`
export const bearer_token="Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5Yjc3Nzc0My1lYWNjLTRmNGQtYWFlNi1kYmZkN2E1ZGEzNmQiLCJqdGkiOiI0MDQ3NGZmNWE5NWRiMjhkOTVjMzlkZDJjMDFjMjExN2RkMDhlYTg4NTViZDJlNTFjNTg0MmMzNGMwMjVhNDY3ZGRmMDhiMjRkN2MxMTY5NCIsImlhdCI6MTcxMDQzMjkzMi42NjMwMzMsIm5iZiI6MTcxMDQzMjkzMi42NjMwMzUsImV4cCI6MTc0MTk2ODkzMi42NDQ3NDMsInN1YiI6IjA1MDZjMjM5LTEwMDctNDE5NS04YjM5LTM2MjRlMGNkZTQzNyIsInNjb3BlcyI6W119.p6TjNWFuoXKAiFOrgxtsHdoigSZ2DhOliPY-lbqObZTBVmKhxtnIarEhHUgVDJTOushJHy3vq-VofUYM2P4xfU64vyrE8a1TeO9G8JXmOfHjM_nxB6T6Bj0ZqOO3II-DVz4Dj2Q2e4KNdFs9GYChKt1aXAuvVhG65otWxC6R30-fkximGjnCiiIFnqEwmeU_yBRNnhEG2qYQ-m-ziiakgeblqSstuFS5s47WQHCfg5KMj3dOifkB-6rzh0zWKSKeUuV5tJCYytsdK7YAJTmKG3vJRec_tZXzaVTkntMvMjNzapQmpQ7hp5U3PbgriO5b_f5mnj_OqXBaRbIOdwEY4WbxqsREEbmWUY0F4gWVF86_XqZcISOUefZ5TZtwOwqiqhslUmM5ni8AmISbFQ4Z47xRqFXmaY1mzeRzL49JAppwixgPq5RtpGcr8dcu5ymXIWWPH76ANd9JVFQdCY2dMj7EyHtPOOig6KSCFrD1iVmKgtEWs-bRrqlo37fCLgt0WJbPYzTpJcQ_SLDXaRVuFTGWFISw0V0nsqJoXXY0zLIiVipBvmK5WcACnTmEpKR36_7Bu2iGrPS9n7ZdyAFh_y6d5ndFOj7WV2JowxRZMrkeTVcwaBbdoc6oWi8ZXSxuK5Wg_13-pw3Q5FqaNAte0fsQn3nQ6tkwysA9jeL9T7I";
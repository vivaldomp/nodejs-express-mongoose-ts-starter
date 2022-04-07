export function Base64ToObject<T extends Object>(base64Str:string):T {
    const buff=Buffer.from(base64Str, 'base64');
    return JSON.parse(buff.toString());
}

export function ObjectToBase64<T extends Object>(objectRef:T):string {
    const objJsonStr = JSON.stringify(objectRef);
    return Buffer.from(objJsonStr).toString("base64");
}

interface IHttpRequestOptions {
  url: string;
}

const get = async (options: IHttpRequestOptions) => {
  try {
    const response = await fetch(options.url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error: unknown) {
    throw new Error(`Fetch error: ${error}`);
  }
};


export const api = {
  get,
}

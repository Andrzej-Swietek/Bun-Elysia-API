import Elysia from "elysia";

export const paginate = ({ request } : { request: Request }) => {        
      const page = parseInt(searchParams(request.url, 'page')  || '1', 10);
      const perPage = parseInt(searchParams(request.url, 'perPage') || '10', 10);      
  
      const skip = (page - 1) * perPage;
      const take = perPage;
  
      const pagination = {
        skip,
        take,
        page,
        perPage,
      };
  
      return {
        pagination,
      };
};

function searchParams(url: string, paramName: string): string | null {
    const urlParts = url.split('?');
    if (urlParts.length !== 2) 
      return null;
    
  
    const queryString = urlParts[1];
    const searchParams = new URLSearchParams(queryString);
    const paramValue = searchParams.get(paramName);
  
    return paramValue !== null ? paramValue : null;
}
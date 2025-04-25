import { env } from '$env/dynamic/private';
import { json, redirect } from '@sveltejs/kit';


export async function POST({request}){
    const {admin} = await request.json();

    if (admin === env.CANVAS_ADMIN_SECRET){
        return json({isAdmin:true})
    }
    return redirect(307, "/");
}
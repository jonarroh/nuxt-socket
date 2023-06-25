export default defineEventHandler(async event => {
	const body = await readBody(event);
	//sacar de body el file
	const file = body.file;
	//convertir el base64 a file
	const base64 = file.split(';base64,').pop();
	const buffer = Buffer.from(base64, 'base64');
	const img = new File([buffer], 'file.png', { type: 'image/png' });

	//subir el file a cloudinary
	const formData = new FormData();
	formData.append('upload_preset', 'daybook');
	formData.append('file', img);
	let resp: any = null;
	try {
		resp = await fetch(`${process.env.CLOUDINARY_URL}`, {
			method: 'POST',
			body: formData
		}).then(res => res.json());

		console.log(resp);
	} catch (error) {
		console.log(error);
		return {
			statusCode: 500,
			body: JSON.stringify({ msg: 'Error al subir la imagen' })
		};
	}

	return resp as CloudinaryAsset;
});

interface CloudinaryAsset {
	asset_id: string;
	public_id: string;
	version: number;
	version_id: string;
	signature: string;
	width: number;
	height: number;
	format: string;
	resource_type: string;
	created_at: string;
	tags: string[];
	bytes: number;
	type: string;
	etag: string;
	placeholder: boolean;
	url: string;
	secure_url: string;
	folder: string;
	access_mode: string;
	original_filename: string;
	original_extension: string;
}

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
	formData.append('file', img);
	formData.append('upload_preset', 'ml_default');

	return { body };
});

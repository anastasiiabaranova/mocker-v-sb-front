const GATEWAY = process.env['GATEWAY'];

if (!GATEWAY) {
	console.error(`Missing Gateway server adresses. Run command as follows:
	npm run build --gateway=gateway_url`);

	throw 'Missing command argument';
}

console.log('gatewayUrl =', GATEWAY)

const fs = require('fs');
const mkdirp = require('mkdirp');

const writeFileToFolder = async (
	path: string,
	filename: string,
	content: string,
	callback: any
) => {
	await fs.mkdir(path, {recursive: true}, (err: any) => {
		if (err) {
			console.error(err);
			throw err;
		} else {
			console.log(`Directory ${path} generated correctly`);
		}
	});
	fs.writeFile(`${path}/${filename}`, content, callback);
};

const setEnv = async () => {
	const envTargetPath = 'apps/mocker/src/environments';
	const envTargetFilename = 'environment.ts';
	const envConfigFile = `export const environment = {
	gatewayUrl: '${GATEWAY}',
};
`;

	writeFileToFolder(
		envTargetPath,
		envTargetFilename,
		envConfigFile,
		(err: any) => {
			if (err) {
				console.error(err);
				throw err;
			} else {
				console.log(
					`Angular environment.ts file generated correctly at ${envTargetPath}`
				);
			}
		}
	);
};

setEnv();

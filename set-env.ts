const GATEWAY_HOST = process.env['gatewayHost'];
const GATEWAY_PORT = process.env['gatewayPort'];

if (!GATEWAY_HOST) {
	throw 'Missing enviroment variable gatewayHost';
}

if (!GATEWAY_PORT) {
	throw 'Missing enviroment variable gatewayPort';
}

const GATEWAY = `http://${GATEWAY_HOST}:${GATEWAY_PORT}`;

console.log('gateway url =', GATEWAY);

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
	production: true,
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

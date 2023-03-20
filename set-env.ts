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
	const writeFile = fs.writeFile;
	const envTargetPath = 'apps/mocker/src/environments';
	const envTargetFilename = 'environment.ts';
	const proxyTargetFilename = 'proxy.conf.json';
	const envConfigFile = `export const environment = {
	serverUrl: '${process.env['SERVER_URL']}',
};
`;
	const proxyConfigFile = `{
	"/api": {
		"target": "${process.env['SERVER_URL']}",
		"secure": false,
		"pathRewrite": {
		  "^/api": ""
		}
	}
}
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

	writeFile(proxyTargetFilename, proxyConfigFile, (err: any) => {
		if (err) {
			console.error(err);
			throw err;
		} else {
			console.log(
				`Angular proxy.conf.json file generated correctly at ${proxyTargetFilename}`
			);
		}
	});
};

setEnv();

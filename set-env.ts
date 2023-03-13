const setEnv = () => {
	const fs = require('fs');
	const writeFile = fs.writeFile;
	const envTargetPath = 'apps/mocker/src/environments/environment.ts';
	const proxyTargetPath = 'proxy.conf.json';
	const envConfigFile = `export const environment = {
	serverUrl: '${process.env['SERVER_URL']}',
};
`;
	const proxyConfigFile = `{
	"/api": {
		"target": "${process.env['SERVER_URL']}"
	}
}
`;
	writeFile(envTargetPath, envConfigFile, (err: any) => {
		if (err) {
			console.error(err);
			throw err;
		} else {
			console.log(
				`Angular environment.ts file generated correctly at ${envTargetPath}`
			);
		}
	});

	writeFile(proxyTargetPath, proxyConfigFile, (err: any) => {
		if (err) {
			console.error(err);
			throw err;
		} else {
			console.log(
				`Angular proxy.conf.json file generated correctly at ${proxyTargetPath}`
			);
		}
	});
};

setEnv();

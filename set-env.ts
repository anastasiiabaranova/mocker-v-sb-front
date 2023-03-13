const setEnv = () => {
	const fs = require('fs');
	const writeFile = fs.writeFile;
	const targetPath = 'apps/mocker/src/environments/environment.ts';
    const envConfigFile = `export const environment = {
	serverUrl: '${process.env['SERVER_URL']}',
};
`
	writeFile(targetPath, envConfigFile, (err: any) => {
		if (err) {
			console.error(err);
			throw err;
		} else {
			console.log(
				`Angular environment.ts file generated correctly at ${targetPath}`
			);
		}
	});
};

setEnv();

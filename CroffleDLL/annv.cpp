#include "pch.h"
#include <iostream>

#define ANNV __declspec(dllexport)

const char* apiKey = "ZpqAUGQVgxFn0PTdOJNnVsFx5aIZd56+f7q9vGH8zd8n1uoVfOu3mgpjz5vQpyhhqrj5pWMA7PFuQhRJjm0pjQ==";

extern "C" {
	ANNV int GetApiKey(char** key) {
		std::cout << "Get API Key from DLL" << std::endl;
		*key = (char*)LocalAlloc(LPTR, strlen(apiKey));
		snprintf(*key, strlen(apiKey) + 1, apiKey);

		return 5;
	}
}
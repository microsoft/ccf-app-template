# CCF App Template

[![Open in VSCode](https://img.shields.io/static/v1?label=Open+in&message=VSCode&logo=visualstudiocode&color=007ACC&logoColor=007ACC&labelColor=2C2C32)](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/microsoft/ccf-app-template)

[![CCF App Template CI](https://github.com/microsoft/ccf-app-template/actions/workflows/ci.yml/badge.svg)](https://github.com/microsoft/ccf-app-template/actions/workflows/ci.yml)

Template repository for CCF applications.

## Quickstart

**The quickest way to build and run this sample CCF app is to checkout this repository locally in its development container by clicking: 
[![Open in VSCode](https://img.shields.io/static/v1?label=Open+in&message=VSCode&logo=visualstudiocode&color=007ACC&logoColor=007ACC&labelColor=2C2C32)](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/microsoft/ccf-app-template)**

All dependencies will be automatically installed (takes ~2 mins on first checkout) and the app can be quickly [built](#build) and [run](#run) by following [the steps below](#build).


Also check out the [code tour](#code-tour) to get an overview of the app.

Alternatively, if your organisation supports it, you can checkout this repository in a Github Codespace: [![Open in Github codespace](https://img.shields.io/static/v1?label=Open+in&message=GitHub+codespace&logo=github&color=2F363D&logoColor=white&labelColor=2C2C32)](https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=496290904&machine=basicLinux32gb&devcontainer_path=.devcontainer.json&location=WestEurope)

---

## Build

In the checkout of this repository:

```bash
$ mkdir build && cd build
$ CC="/opt/oe_lvi/clang-10" CXX="/opt/oe_lvi/clang++-10" cmake -GNinja ..
$ ninja
$ ls
libccf_app.enclave.so.signed # SGX-enabled application
libccf_app.virtual.so # Virtual application (i.e. insecure!)
```

See [docs](https://microsoft.github.io/CCF/main/build_apps) for complete instructions on how to build a CCF app.

## Run

```bash
$ /opt/ccf/bin/sandbox.sh -p ./libccf_app.virtual.so
Setting up Python environment...
Python environment successfully setup
[12:00:00.000] Virtual mode enabled
[12:00:00.000] Starting 1 CCF node...
[12:00:00.000] Started CCF network with the following nodes:
[12:00:00.000]   Node [0] = https://127.0.0.1:8000
[12:00:00.000] You can now issue business transactions to the ./libccf_app.virtual.so application
[12:00:00.000] Keys and certificates have been copied to the common folder: .../ccf-app-template/build/workspace/sandbox_common
[12:00:00.000] See https://microsoft.github.io/CCF/main/use_apps/issue_commands.html for more information
[12:00:00.000] Press Ctrl+C to shutdown the network
```

Or, for an SGX-enabled application (unavailable in development container): `$ /opt/ccf/bin/sandbox.sh -p ./libccf_app.enclave.so.signed -e release`

In another terminal:

```bash
$ cd build
$ curl -X POST https://127.0.0.1:8000/app/log?id=1 --cacert ./workspace/sandbox_common/service_cert.pem -H "Content-Type: application/json" --data '{"msg": "hello world"}'
$ curl https://127.0.0.1:8000/app/log?id=1 --cacert ./workspace/sandbox_common/service_cert.pem
"hello world"
```

## Docker

It is possible to build a runtime image of this application via docker:

```bash
$ docker build -t ccf-app-template:enclave -f docker/ccf_app.enclave .
$ docker run --device /dev/sgx_enclave:/dev/sgx_enclave --device /dev/sgx_provision:/dev/sgx_provision -v /dev/sgx:/dev/sgx ccf-app-template:enclave
...
2022-01-01T12:00:00.000000Z -0.000 0   [info ] ../src/node/node_state.h:1790        | Network TLS connections now accepted
# It is then possible to interact with the service
```

Or, for the non-SGX (a.k.a. virtual) variant:

```bash
$ docker build -t ccf-app-template:virtual -f docker/ccf_app.virtual .
$ docker run ccf-app-template:virtual
```

## Dependencies

If this repository is checked out on a bare VM (e.g. [for SGX deployments](https://docs.microsoft.com/en-us/azure/confidential-computing/quick-create-portal)), the dependencies required to build and run the CCF app can be installed as follows:

```bash
$ wget https://github.com/microsoft/CCF/releases/download/ccf-2.0.0/ccf_2.0.7_amd64.deb
$ sudo dpkg -i ccf_2.0.7_amd64.deb # Install CCF under /opt/ccf
$ cat /opt/ccf/share/VERSION_LONG
ccf-2.0.7
$ /opt/ccf/getting_started/setup_vm/run.sh /opt/ccf/getting_started/setup_vm/app-dev.yml # Install dependencies
```

See the [CCF official docs](https://microsoft.github.io/CCF/main/build_apps/install_bin.html#install-ccf) for more info.

## Code Tour

In VSCode, a [code tour](https://marketplace.visualstudio.com/items?itemName=vsls-contrib.codetour) of this app can be started with: Ctrl + P, `> CodeTour: Start Tour`

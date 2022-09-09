# CCF App Template

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=496290904&machine=basicLinux32gb&devcontainer_path=.devcontainer.json&location=WestEurope)

[![CCF App Template CI](https://github.com/microsoft/ccf-app-template/actions/workflows/ci.yml/badge.svg)](https://github.com/microsoft/ccf-app-template/actions/workflows/ci.yml)

Template repository for CCF applications.

## Quickstart

**The quickest way to build and run this sample CCF app is to create a GitHub codespace by clicking [here](https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=496290904&machine=basicLinux32gb&devcontainer_path=.devcontainer.json&location=WestEurope).**

All dependencies will be automatically installed and the application can be quickly [built](#build) and [run](#test) by following the steps below.

Also check out the [code tour](#code-tour) to get an overview of the app.

---

## Build

In the local checkout of this repository:

```bash
$ mkdir build & cd build
$ CC="/opt/oe_lvi/clang-10" CXX="/opt/oe_lvi/clang++-10" cmake -GNinja ..
$ ninja
$ ls
libccf_app.enclave.so.signed # SGX-enabled application
libccf_app.virtual.so # Virtual application (i.e. insecure!)
```

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

Or, for an SGX-enabled application (unavailable in Github codespace): `$ /opt/ccf/bin/sandbox.sh -p ./libccf_app.enclave.so.signed -e release`

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
$ docker build -t ccf-app-template .
$ docker run --device /dev/sgx_enclave:/dev/sgx_enclave --device /dev/sgx_provision:/dev/sgx_provision -v /dev/sgx:/dev/sgx ccf-app-template
...
2022-01-01T12:00:00.000000Z -0.000 0   [info ] ../src/node/node_state.h:1790        | Network TLS connections now accepted
# It is then possible to interact with the service
```

## Dependencies

If this repository is checked out on a bare VM (e.g. for SGX deployments), the dependencies required to build and run the CCF app can be installed as follows:

```bash
$ wget https://github.com/microsoft/CCF/releases/download/ccf-2.0.0/ccf_2.0.0_amd64.deb
$ sudo dpkg -i ccf_2.0.0_amd64.deb # Install CCF under /opt/ccf
$ cat /opt/ccf/share/VERSION_LONG
ccf-2.0.0
$ /opt/ccf/getting_started/setup_vm/run.sh /opt/ccf/getting_started/setup_vm/app-dev.yml # Install dependencies
```

Alternatively, you can checkout this repository in a [VSCode development container](https://code.visualstudio.com/docs/remote/containers).

## Code Tour

In VSCode, a [code tour](https://marketplace.visualstudio.com/items?itemName=vsls-contrib.codetour) of this app can be started with: Ctrl + P, `> CodeTour: Start Tour`

# CCF C++ App Template

Template repository for CCF C++ applications.

## Install Dependencies

Install CCF and its dependencies:

```bash
$ wget https://github.com/microsoft/CCF/releases/download/ccf-2.0.0/ccf_2.0.0_amd64.deb
$ sudo dpkg -i ccf_2.0.0_amd64.deb # Install CCF under /opt/ccf
$ cat /opt/ccf/share/VERSION_LONG
ccf-2.0.0
$ /opt/ccf/getting_started/setup_vm/run.sh # Install dependencies
```

Alternatively, you can checkout this repository in a [VSCode development container](https://code.visualstudio.com/docs/remote/containers).

## Build

In the local checkout of this repository:

```bash
$ cd ccf_app_template
$ mkdir build
$ cd build
$ CC="/opt/oe_lvi/clang-10" CXX="/opt/oe_lvi/clang++-10" cmake -GNinja ..
$ ninja
$ ls
libccf_app.enclave.so.signed # SGX-enabled application
libccf_app.virtual.so # Virtual application (i.e. insecure!)
```

## Test

```bash
$ /opt/ccf/bin/sandbox.sh -p ./libccf_app.virtual.so
Setting up Python environment...
Python environment successfully setup
[12:00:00.000] Virtual mode enabled
[12:00:00.000] Starting 1 CCF node...
[12:00:00.000] Started CCF network with the following nodes:
[12:00:00.000]   Node [0] = https://127.0.0.1:8000
[12:00:00.000] You can now issue business transactions to the ./libccf_app.virtual.so application
[12:00:00.000] Keys and certificates have been copied to the common folder: /home/jumaffre/git/ccf_app_template/build/workspace/sandbox_common
[12:00:00.000] See https://microsoft.github.io/CCF/main/use_apps/issue_commands.html for more information
[12:00:00.000] Press Ctrl+C to shutdown the network
```

Or, for an SGX-enabled application: `$ /opt/ccf/bin/sandbox.sh -p ./libccf_app.enclave.so.signed -e release`

In another terminal:

```bash
$ cd ccf_app_template/build
$ curl -X POST https://127.0.0.1:8000/app/log?id=1 --cacert ./workspace/sandbox_common/service_cert.pem -H "Content-Type: application/json" --data '{"msg": "hello world"}'
$ curl https://127.0.0.1:8000/app/log?id=1 --cacert ./workspace/sandbox_common/service_cert.pem
"hello world"
```

## Code Tour

To get a guided tour of the sample application, checkout this repository in VSCode and use the [CodeTour extension](https://marketplace.visualstudio.com/items?itemName=vsls-contrib.codetour).

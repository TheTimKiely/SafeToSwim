'''
Copyright (C) 2018 Tim Kiely
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Authors:
    Tim Kiely <thetimkiely@gmail.com>
'''

from distutils.core import setup

setup(
    name='SafeToSwim',
    author='Tim Kiely',
    classifiers=
    [
        'Development Status :: 3 - Alpha',
        'Topic :: Scientific/Engineering :: Artificial Intelligence',
        'Topic :: Scientific/Engineering :: Image Recognition',
        'Topic :: Scientific/Engineering :: GIS',
        'Programming Language :: Python :: 3.6',
        'License :: OSI Approved :: Apache Software License'
    ],
    keywords='binaryclassifier machinelearning deeplearning',
    python_requires='>=3',
    version='0.1.3a1',
    packages=['safetoswim'],
    install_requires=['rembrandtml'],
    license='Apache License 2.0',
    long_description=open('README.md').read(),
    entry_points=
    {
        'console_scripts':
            [
                'safetoswim=safetoswim.__main__:main'
            ]
    }
)
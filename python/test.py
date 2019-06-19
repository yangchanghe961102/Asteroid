# -*- coding: UTF8 -*-

import threading
import time
import math
import json
import os

access_time_list = []
ACCESS_TIME_LIST_MAX = 2
access_time_log = open('C:/Users/LYDDD/Desktop/sciviscontest2018' + '/log.txt', 'r')

def clean_cached_file():
    global access_time_list
    # global access_time_log
    WRITE_FILE_PERIOD = 5
    write_file_cnt = 0

    while True:
        if len(access_time_list) > ACCESS_TIME_LIST_MAX:
            print('Start cleaning...')
            for i in range(len(access_time_list) - ACCESS_TIME_LIST_MAX):
                cached_file = access_time_list.pop(0)
                # print(cached_file)
                #if os.path.exists(directory + '/view_output/' + cached_file):
                #    os.remove(directory + '/view_output/' + cached_file)
            print('End cleaning.')
            # print(access_time_list)
        
        write_file_cnt += 1

        if write_file_cnt >= WRITE_FILE_PERIOD:
            print('Start saving log...')
            access_time_log_new = open('C:/Users/LYDDD/Desktop/sciviscontest2018' + '/log_new.txt', 'w')
            write_file_cnt = 0
            for item in access_time_list:
                access_time_log_new.write(item + '\n')
            access_time_log_new.close()
            print('Saving ended.')

        time.sleep(1)

def load_access_time():
    global access_time_list
    for line in access_time_log:
        access_time_list.append(line.split('\n')[0])
    print(access_time_list)

if __name__ == '__main__':
    load_access_time()
    print('Cached file access time loaded.')
    filename = '212331'
    if filename in access_time_list:
        access_time_list.remove(filename)
    access_time_list.append(filename)
    clean_cached_file()

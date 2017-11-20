/**
*   Return the second largest number in the array.
*   @param {Number[]} nums - An array of numbers.
*   @return {Number} The second largest number in the array.
**/
function getSecondLargest(nums) {
    //nums = [2,3,3,2,1,4,5,5,4];

    // Complete the function
    var largest = 0;
    var sndLargest = 0;
    for(var i = 0; i<nums.length;i++){
        if(nums[i]>largest){
            sndLargest = largest;
            largest = nums[i];
        }
        else if(nums[i]>sndLargest)
            if(largest != nums[i])
                sndLargest = nums[i];
    }
    return sndLargest;
}
